export function convertTextStatus(status: string){
  switch (status) {
    case 'open':
      return 'Aberto';
    case 'inProgress':
      return 'Em Andamento';
    case 'pending':
      return 'Pendente';
    case 'completed':
      return 'Concluído';
    default:
      return 'Desconhecido';
  }
}

export function convertTextPriority(priority: string){
  switch (priority) {
    case 'low':
      return 'Baixa';
    case 'medium':
      return 'Média';
    case 'high':
      return 'Alta';
    default:
      return 'Desconhecida';
  }
}
