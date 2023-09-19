import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import deleteTask from 'src/services/deleteTask';
import React from 'react';
import { DeleteIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { IoEllipsisVerticalIcon } from '../assets/icons';
import { useNavigate } from 'react-router-dom';

interface TaskProps {
  taskName: string;
  taskInstance: string;
  style?: React.CSSProperties;
}

export const DotButton: React.FC<TaskProps> = ({
  taskName,
  taskInstance,
  style,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);
  return (
    <Box style={style}>
      <Menu>
        <MenuButton
          as={IconButton}
          rounded={6}
          aria-label="Options"
          variant="outline"
          icon={<IoEllipsisVerticalIcon />}
          onClick={(event) => event.stopPropagation()}
        />

        <MenuList padding={0}>
          <MenuItem
            rounded={6}
            minBlockSize={10}
            onClick={(event) => {
              navigate(`/history/${taskName}/${taskInstance}`);
              event.stopPropagation();
            }}
            icon={<InfoOutlineIcon boxSize={4} />}
          >
            See history for task
          </MenuItem>
          <MenuItem
            rounded={6}
            minBlockSize={10}
            onClick={(event) => {
              event.stopPropagation();
              setIsOpen(true);
            }}
            icon={<DeleteIcon boxSize={4} />}
          >
            Delete task
          </MenuItem>
        </MenuList>
      </Menu>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete, {taskName} Task-ID:{taskInstance}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={(event) => {
                  event.stopPropagation();
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={(event) => {
                  event.stopPropagation();
                  deleteTask(taskInstance, taskName);
                  onClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};
