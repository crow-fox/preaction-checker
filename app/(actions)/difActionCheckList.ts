import { ActionCheckList } from "@/app/_types/action";

export const getDeletedActionCheckList = <T extends ActionCheckList>(
  originalActionCheckList: T,
  newActionCheckList: T
) => {
  const newActionCheckListIds = newActionCheckList.map((item) => item.id);

  const deletedActionCheckList = originalActionCheckList.filter(
    ({ id }) => !newActionCheckListIds.includes(id)
  );

  return deletedActionCheckList;
};

export const getAddedActionCheckList = <T extends ActionCheckList>(
  originalActionCheckList: T,
  newActionCheckList: T
) => {
  const originalActionCheckListIds = originalActionCheckList.map(
    (item) => item.id
  );

  const addedActionCheckList = newActionCheckList.filter(
    ({ id }) => !originalActionCheckListIds.includes(id)
  );

  return addedActionCheckList;
};

export const getUpdatedActionCheckList = <T extends ActionCheckList>(
  originalActionCheckList: T,
  newActionCheckList: T
) => {
  const updatedActionCheckList = newActionCheckList.filter(({ id }) => {
    const originalItem = originalActionCheckList.find((item) => item.id === id);
    const newItem = newActionCheckList.find((item) => item.id === id);
    if (!originalItem || !newItem) return false;
    if (originalItem.title !== newItem.title) return true;
    if (
      originalItem.completed !== undefined &&
      newItem.completed !== undefined
    ) {
      if (originalItem.completed !== newItem.completed) return true;
    }

    return false;
  });

  return updatedActionCheckList;
};
