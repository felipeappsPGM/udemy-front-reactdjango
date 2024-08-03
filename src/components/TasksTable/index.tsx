//import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router';
import { Employee } from 'src/models/Employee';
import { useAuth } from 'src/utils/auth';
import { useRequests } from 'src/utils/requests';
import { DeleteTwoTone, EditTwoTone } from '@mui/icons-material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { useTheme } from '@mui/material';
import {
  Card,
  Container,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material';
import { Task } from 'src/models/Task';
import { useDate } from 'src/utils/formatDate';
type Props = {
  tasksList: Task[];
  refreshList: () => void;
};

const TasksTable = ({ tasksList, refreshList }: Props) => {
  console.log(tasksList);
  const { handlePermissionsExists } = useAuth();
  const { formatAPIdate } = useDate();
  const { deleteTask } = useRequests();

  const theme = useTheme();
  const navigate = useNavigate();

  const handleEditTask = (id: number) => {
    navigate(`/tasks/edit/${id}`);
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);

    refreshList();
  };

  return (
    <Container maxWidth="lg">
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Titulo</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Prazo máximo</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasksList.map((task) => (
                <TableRow hover key={task.id}>
                  <TableCell>
                    <Typography fontWeight="bold" gutterBottom>
                      #{task.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold" gutterBottom>
                      {task.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold" gutterBottom>
                      {task.status}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography fontWeight="bold" gutterBottom>
                      {task.due_date
                        ? formatAPIdate(task.due_date)
                        : 'Sem prazo'}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {handlePermissionsExists('change_task') && (
                      <Tooltip title="Editar tarefa" arrow>
                        <IconButton
                          sx={{
                            '&: hover': {
                              background: theme.colors.primary.lighter
                            },
                            color: theme.palette.primary.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => handleEditTask(task.id)}
                        >
                          <EditTwoToneIcon />
                        </IconButton>
                      </Tooltip>
                    )}

                    {handlePermissionsExists('delete_task') && (
                      <Tooltip title="Excluir tarefa" arrow>
                        <IconButton
                          sx={{
                            '&: hover': {
                              background: theme.colors.primary.lighter
                            },
                            color: theme.palette.error.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          <DeleteTwoTone />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
};

export default TasksTable;
