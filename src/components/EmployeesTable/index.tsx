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
type Props = {
  employeesList: Employee[];
  refreshList: () => void;
};

const EmployeesTable = ({ employeesList, refreshList }: Props) => {
  console.log(employeesList);
  const { handlePermissionsExists } = useAuth();

  const { deleteEmployee } = useRequests();

  const theme = useTheme();
  const navigate = useNavigate();

  const handleEditEmployee = (id: number) => {
    navigate(`/employees/edit/${id}`);
  };

  const handleDeleteEmployee = async (id: number) => {
    await deleteEmployee(id);

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
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employeesList.map((employee) => (
                <TableRow hover key={employee.id}>
                  <TableCell>
                    <Typography fontWeight="bold" gutterBottom>
                      #{employee.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold" gutterBottom>
                      {employee.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold" gutterBottom>
                      {employee.email}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {handlePermissionsExists('change_employee') && (
                      <Tooltip title="Editar funcionário" arrow>
                        <IconButton
                          sx={{
                            '&: hover': {
                              background: theme.colors.primary.lighter
                            },
                            color: theme.palette.primary.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => handleEditEmployee(employee.id)}
                        >
                          <EditTwoToneIcon />
                        </IconButton>
                      </Tooltip>
                    )}

                    {handlePermissionsExists('delete_employee') && (
                      <Tooltip title="Demitir funcionário" arrow>
                        <IconButton
                          sx={{
                            '&: hover': {
                              background: theme.colors.primary.lighter
                            },
                            color: theme.palette.error.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => handleDeleteEmployee(employee.id)}
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

export default EmployeesTable;
