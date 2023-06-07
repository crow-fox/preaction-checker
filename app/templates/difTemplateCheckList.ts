import { TemplateCheckList } from "@/app/_types/template";

export const getDeletedTemplateCheckList = <T extends TemplateCheckList>(
  originalCheckList: T,
  newCheckList: T
) => {
  const newCheckListIds = newCheckList.map((item) => item.id);

  const deletedCheckList = originalCheckList.filter(
    ({ id }) => !newCheckListIds.includes(id)
  );

  return deletedCheckList;
};

export const getAddedTemplateCheckList = <T extends TemplateCheckList>(
  originalCheckList: T,
  newCheckList: T
) => {
  const originalCheckListIds = originalCheckList.map((item) => item.id);

  const addedCheckList = newCheckList.filter(
    ({ id }) => !originalCheckListIds.includes(id)
  );

  return addedCheckList;
};

export const getUpdatedTemplateCheckList = <T extends TemplateCheckList>(
  originalCheckList: T,
  newCheckList: T
) => {
  const updatedCheckList = newCheckList.filter(({ id }) => {
    const originalItem = originalCheckList.find((item) => item.id === id);
    const newItem = newCheckList.find((item) => item.id === id);
    if (!originalItem || !newItem) return false;
    if (originalItem.title !== newItem.title) return true;

    return false;
  });

  return updatedCheckList;
};
