import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";

import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

// -------------------------
const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabinToEdit = {} }) {
  //

  const { id: idToEdit, ...editValues } = cabinToEdit;

  // creating a bool that determines the functionality of the form

  // if thi var is True than the form is for editing alrady existing cabins
  // else its for creating a cabin
  const isEditSession = Boolean(idToEdit);

  //
  // creating default value based on isEditSession

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  // get the query client using useQueryClient

  // using use Mutation to invalidate query to get updates in UI

  // const { isLoading, mutate: createCabin } = useMutation({
  //   mutationFn: (data) => addCabin(data),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ["cabin"],
  //     });
  //     toast.success("cabin successfully added");
  //     reset();
  //   },
  //   onError: (err) => toast.error(err.message),
  // });

  const { isLoading, createCabin } = useCreateCabin();

  //
  // const { isLoading: isEditing, mutate: editCabin } = useMutation({
  //   mutationFn: ({ newCabinData, id }) => addCabin(newCabinData, id),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ["cabin"],
  //     });
  //     toast.success("cabin successfully edited");
  //     reset();
  //   },
  //   onError: (err) => toast.error(err.message),
  // });

  const { isEditin, editCabin } = useEditCabin();

  //--------------

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      editCabin({
        newCabinData: {
          ...data,
          image,
        },
        id: idToEdit,
      });
    } else {
      createCabin(
        { ...data, image: data.image[0] },
        { onSuccess: () => reset() }
      );
    }
  }

  function onError(erros) {
    // console.log(erros);
  }

  function handleModalClose(e) {
    e.preventDefault();
  }

  // ------------------------------------------------------------------
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type="modal">
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>

        <Input
          type="text"
          disabled={isLoading}
          id="name"
          {...register("name", {
            required: "This field is requierd",
          })}
        />

        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          disabled={isLoading}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is requierd",
            min: {
              value: 1,
              message: "the capacity should at least be 1",
            },
          })}
        />
        {errors?.maxCapacity?.message && (
          <Error>{errors.maxCapacity.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          disabled={isLoading}
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is requierd",
            min: {
              value: 1,
              message: "the capacity should at least be 1",
            },
          })}
        />
        {errors?.regularPrice?.message && (
          <Error>{errors.regularPrice.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          disabled={isLoading}
          defaultValue={0}
          {...register("discount", {
            required: "This field is requierd",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "discount should be less than regular price",
          })}
        />
        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          disabled={isLoading}
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is requierd",
          })}
        />
        {errors?.description?.message && (
          <Error>{errors.description.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          type="file"
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is requierd",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {" "}
          {isEditSession ? "Edit cabin" : " Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
