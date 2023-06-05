type CheckListItem = {
  id: string;
  title: string;
  order: number;
  completed?: boolean;
};
type CheckList = CheckListItem[];

export const getDeletedCheckList = <T extends CheckList>(
  originalCheckList: T,
  newCheckList: T
) => {
  const newCheckListIds = newCheckList.map((item) => item.id);

  const deletedCheckList = originalCheckList.filter(
    ({ id }) => !newCheckListIds.includes(id)
  );

  return deletedCheckList;
};

export const getAddedCheckList = <T extends CheckList>(
  originalCheckList: T,
  newCheckList: T
) => {
  const originalCheckListIds = originalCheckList.map((item) => item.id);

  const addedCheckList = newCheckList.filter(
    ({ id }) => !originalCheckListIds.includes(id)
  );

  return addedCheckList;
};

export const getUpdatedCheckList = <T extends CheckList>(
  originalCheckList: T,
  newCheckList: T
) => {
  const editedCheckList = newCheckList.filter(({ id }) => {
    const originalItem = originalCheckList.find((item) => item.id === id);
    const newItem = newCheckList.find((item) => item.id === id);
    if (!originalItem || !newItem) return false;
    if (originalItem.title !== newItem.title) return true;
    if (originalItem.order !== newItem.order) return true;
    if (originalItem.completed !== newItem.completed) return true;
    return false;
  });

  return editedCheckList;
};
