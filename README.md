# clean-node-api

domain => vai conter todos os contratos/interfaces que a camada de data vai precisar. Isso é para que a camada de data dependa de uma abstração e não de uma implementação.
infra => Vai conter as tecnologias que serão usada no projeto. Implementação da camada de domain ou outras.
main => Vai conter as a composições da aplicação, montar as dependencias.
presentation => Camada que vai fazer a intermediação entre o mundo externo e interno. Vai ter controllers que vão fazer input e validação dos dados para passar para a camada de usecases.
data => Camada que vai conter a regra de negocio da aplicação em si.
