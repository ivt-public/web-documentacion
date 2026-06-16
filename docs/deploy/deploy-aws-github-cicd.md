Manual de Arquitectura: Portal de APIs Seguro y Centralizado
Este documento detalla la infraestructura de despliegue y seguridad para el ecosistema de portales de documentación (Docusaurus) alojados en Amazon S3, utilizando un modelo de Gobierno Centralizado y autenticación OIDC (OpenID Connect).

1. Concepto de la SoluciónLa arquitectura se basa en un repositorio maestro (ops-central) que contiene la lógica de despliegue y la lista blanca de IPs. 

Los repositorios de APIs individuales consumen esta lógica, eliminando la necesidad de gestionar credenciales manuales (Secrets) en cada proyecto.
Seguridad: Restricción de acceso por IP mediante S3 Bucket Policies.Autenticación: AWS OIDC (Sin llaves de acceso estáticas).
Escalabilidad: Soporte nativo para múltiples cuentas de AWS (Dev, Prd, etc.).

2. Configuración en AWS (Por cada Cuenta)
Para que GitHub pueda "hablar" con AWS sin contraseñas, se debe configurar un Identity Provider.7

2.1 Crear el Identity ProviderNavegar a IAM > Identity Providers.

Crear un nuevo proveedor:Tipo: OpenID Connect.URL: https://token.actions.githubusercontent.comAudience: sts.amazonaws.com

2.2 Crear el Rol de DespliegueCrear un rol llamado GitHubActionRole con la siguiente Política de Confianza:JSON \{
  "Version": "2012-10-17",
  "Statement": [
    \{
      "Effect": "Allow",
      "Principal": \{
        "Federated": "arn:aws:iam::TU_ID_CUENTA:oidc-provider/token.actions.githubusercontent.com"
      \},
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": \{
        "StringLike": \{
          "token.actions.githubusercontent.com:sub": "repo:TU_USUARIO_GITHUB/\*:\*"
        \}
      \}
    \}
  ]
\}

3. Estructura del Repositorio Maestro (ops-central)Este repositorio debe tener la siguiente estructura de archivos:Plaintextops-central/
├── whitelist/
│   └── ips.txt           \<-- Lista administrable de IPs
└── .github/
    └── workflows/
        └── main-deploy.yml  \<-- Workflow reutilizable

3.1 El Workflow Reutilizable (main-deploy.yml)Este archivo contiene la lógica que construye el sitio, lo sube a S3 y bloquea las IPs no autorizadas.

4. Implementación en Repositorios de APICada portal de API (ej. api-ventas) debe crear un archivo en .github/workflows/release.yml para llamar a la lógica central.

Ejemplo de Configuración:YAML
name: Release Documentation
on:
  push:
    tags:
      - 'v*' # Se dispara solo al crear una versión

jobs:
  deploy:
    # Llamada al repositorio maestro
    uses: TU_USUARIO/ops-central/.github/workflows/main-deploy.yml@main
    with:
      bucket_name: 'mi-bucket-produccion'
      aws_role_arn: 'arn:aws:iam::123456789012:role/GitHubActionRole'
      aws_region: 'us-east-1'

5. Administración de Accesos (Whitelist)
Para dar acceso a un nuevo usuario o IP:

Editar el archivo whitelist/ips.txt en el repositorio ops-central.Realizar un Commit de los cambios.

El acceso se actualizará automáticamente en el siguiente despliegue de cualquier API.

Nota: Se recomienda usar formato CIDR (ej: 1.2.3.4/32 para una IP única).

6. Diferenciación de AmbientesAl usar esta arquitectura, puedes manejar múltiples cuentas de AWS de forma transparente:AmbienteCuenta AWSBranch/TagConfiguración en WorkflowDesarrolloCuenta 01mainUsar ARN del Rol de Cuenta 01ProducciónCuenta 02tags/v*Usar ARN del Rol de Cuenta 02