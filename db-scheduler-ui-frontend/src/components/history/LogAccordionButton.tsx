import { AccordionButton, Box, HStack } from '@chakra-ui/react';
import { LogStatus } from 'src/components/history/LogStatus';
import { dateFormatText } from 'src/components/dateFormatText';

interface LogAccordionButtonProps {
  succeeded: boolean;
  id: number;
  taskName: string;
  taskInstance: string;
  exceptionClass: string | null;
  exceptionMessage: string | null;
  timeFinished: Date;
}

export const LogAccordionButton: React.FC<LogAccordionButtonProps> = (
  props,
) => {
  return (
    <h2>
      <AccordionButton _hover={{ backgroundColor: '#FFFFFF' }}>
        <HStack w={'100%'} spacing={5}>
          <Box flex="1" display="inline-flex">
            <LogStatus succeeded={props.succeeded} />
          </Box>
          <Box flex="2" textAlign="left">
            {props.id}
          </Box>
          <Box flex="2" textAlign="left">
            {props.taskInstance}
          </Box>
          <Box flex={'2'} textAlign={'left'}>
            {dateFormatText(new Date(props.timeFinished))}
          </Box>
          <Box flex="2" textAlign="left">
            {props.exceptionClass}
          </Box>
          <Box flex="2" textAlign="left">
            {props.exceptionMessage}
          </Box>
        </HStack>
      </AccordionButton>
    </h2>
  );
};
