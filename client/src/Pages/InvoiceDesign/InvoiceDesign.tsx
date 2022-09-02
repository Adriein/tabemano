import { DndContext, useDroppable } from '@dnd-kit/core';
import React from 'react';
import { Box, MantineTheme } from '@mantine/core';
import Draggable from "../../Shared/Components/Draggable";

const InvoiceDesign = () => {
  const { setNodeRef } = useDroppable({
    id: 'invoice-droppable-id',
  });
  const handleDragEnd = (event: any) => {
    console.log(event)
    if (event.over && event.over.id === 'invoice-droppable-id') {
      console.log('aaaaa')
    }
  }
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Box
        sx={(theme: MantineTheme) => ({
          display: 'flex'
        })}
      >
        <Box
          sx={(theme: MantineTheme) => ({
            flexGrow: 1
          })}

        >
          <Box
            ref={setNodeRef}
            sx={(theme: MantineTheme) => ({
              backgroundColor: theme.colors.gray[0],
              borderRadius: theme.radius.md,
              cursor: 'pointer',
              height: window.innerHeight - 92,
              width: '800px',
            })}
          >
          </Box>
        </Box>
        <Box
          sx={(theme: MantineTheme) => ({
            backgroundColor: theme.colors.gray[0],
            borderRadius: theme.radius.md,
            cursor: 'pointer',
            height: window.innerHeight - 92,
            width: '300px',
            marginLeft: '20px'
          })}
        >
          <Draggable>
            <div>draggable item</div>
          </Draggable>
        </Box>
      </Box>
    </DndContext>


  );
}

export default InvoiceDesign;