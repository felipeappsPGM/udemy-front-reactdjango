import {
  Button,
  colors,
  Container,
  LinearProgress,
  Snackbar,
  Stack,
  TextField
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import SelectEmployee from 'src/components/SelectEmployee';
import SelectTaskStatus from 'src/components/SelectTaskStatus';
import { PermissionMiddleware } from 'src/middlewares/PermissionsMiddleware';
import { useDate } from 'src/utils/formatDate';
import { useRequests } from 'src/utils/requests';

const EditTask = () => {
  const [requestLoading, setRequestLoading] = useState(true);
  const [infoMessage, setInfoMessage] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [dateTimeInput, setDateTimeInput] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<number | ''>(1);
  const [selectedStatus, setSelectedStatus] = useState(1);

  const navigate = useNavigate();
  const { id: task_id } = useParams();
  const { formatDateForAPI } = useDate();
  const { editTask, getAnTask } = useRequests();

  const handleGetTask = async () => {
    const response = await getAnTask(+task_id);
    const task = response.data.task;

    if (!response.detail) {
      setTitleInput(task.title);
      setDescriptionInput(task.description);
      setDateTimeInput(task.due_date ? task.due_date.slice(0, -4) : null);
      console.log('fihsdhfsdjfsdfklsdf', task.due_date);
      setSelectedEmployee(task.employee.id);
      setSelectedStatus(
        task.status == 'Não iniciado'
          ? 1
          : task.status == 'Em andamento'
          ? 2
          : 3
      );
    }
  };

  const handleEdit = async () => {
    const [title, employee_id, status_id] = [
      titleInput,
      selectedEmployee,
      selectedStatus
    ];
    const due_date = dateTimeInput ? formatDateForAPI(dateTimeInput) : null;
    console.log('formatado', due_date);
    const description = descriptionInput ? descriptionInput : null;

    if (!title || !employee_id) {
      setInfoMessage('Preencha todos os campos');
      return;
    }

    setRequestLoading(true);
    const response = await editTask(+task_id, {
      title,
      description,
      due_date,
      employee_id,
      status_id
    });

    setRequestLoading(false);

    if (response.detail) {
      setInfoMessage(response.detail);
      return;
    }

    navigate('/tasks');
  };

  useEffect(() => {
    Promise.resolve(handleGetTask()).finally(() => {
      setRequestLoading(false);
    });
  }, []);

  return (
    <>
      <PermissionMiddleware codeName="change_task">
        <Helmet>
          <title>Adicionar uma Tarefa</title>
        </Helmet>
        {requestLoading && (
          <LinearProgress sx={{ height: 2 }} color="primary" />
        )}
        <PageTitleWrapper>
          <PageTitle
            heading="Editar uma tarefa"
            subHeading="Edite uma tarefa e configure, título, descrição, prazo máximo, funcionário, status e etc"
          />
        </PageTitleWrapper>

        <Snackbar
          open={infoMessage != ''}
          onClose={() => setInfoMessage('')}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          message={infoMessage}
        />

        <Container maxWidth="lg">
          <Stack maxWidth={700} spacing={3}>
            <TextField
              fullWidth
              label="Título *"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />

            <TextField
              fullWidth
              label="Descrição"
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
            />

            <TextField
              fullWidth
              type="datetime-local"
              value={dateTimeInput}
              onChange={(e) => setDateTimeInput(e.target.value)}
            />

            <SelectEmployee
              selectedEmployee={selectedEmployee}
              setSelectedEmployee={setSelectedEmployee}
            />

            <SelectTaskStatus
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
            />

            <Button
              variant="outlined"
              sx={{ width: 90, mt: 3.5 }}
              onClick={requestLoading ? () => null : handleEdit}
              disabled={requestLoading}
            >
              Editar
            </Button>
          </Stack>
        </Container>
      </PermissionMiddleware>
    </>
  );
};

export default EditTask;
