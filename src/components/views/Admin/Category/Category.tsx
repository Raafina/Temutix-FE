import DataTable from "@/components/ui/DataTable";
import { useRouter } from "next/router";
import {
  Button,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
} from "@heroui/react";
import Image from "next/image";
import { Key, ReactNode, useCallback } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LIST_CATEGORY } from "./Category.constants";
import LIMIT_LISTS from "@/list.constants";

const Category = () => {
  const { push } = useRouter();

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];
      switch (columnKey) {
        case "icon":
          return (
            <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
          );
        case "actions":
          return (
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <CiMenuKebab className="text-default-700" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="detail-category-buton"
                  onPress={() => push(`/admin/category/${category.id}`)}
                >
                  Detail Category
                </DropdownItem>
                <DropdownItem
                  key="delete-category"
                  className="text-danger-500"
                  onPress={() => push(`/admin/category/${category.id}`)}
                >
                  Detail Category
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      <DataTable
        columns={COLUMN_LIST_CATEGORY}
        data={[
          {
            _id: 123,
            name: "Category 1",
            description: "Description 1",
            icon: "/images/general/logo.png",
          },
        ]}
        emptyContent="Category is empty"
        limit={LIMIT_LISTS[0].label}
        onChangeLimit={() => {}}
        currentPage={1}
        onChangePage={() => {}}
        onChangeSearch={() => {}}
        onClearSearch={() => {}}
        buttonTopContentLabel="Create Category"
        onClickButtonTopContent={() => {}}
        renderCell={renderCell}
        totalPages={100}
      />
    </section>
  );
};

export default Category;
