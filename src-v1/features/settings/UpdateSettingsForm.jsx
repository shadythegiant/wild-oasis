import Form from "../../ui/Form";
import FormRow from "../../ui/FormRaw";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useEditSettings from "./useEditSettings";
import useSettings from "./useSettings";

function UpdateSettingsForm() {
  const {
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestPerBooking,
      breakfastPrice,
    } = {}, // because this var aren't there in the beginning so we assign it the empty ob
    isLoading,
  } = useSettings();

  const { isEditing, editSetting } = useEditSettings();

  function handleEdit(e, fieldName) {
    const { value } = e.target;
    editSetting({ [fieldName]: value });
  }

  //---------------------------------------------- conditional jsx

  if (isLoading) return <Spinner />;
  // ---------------------------------------------- the JSX

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(e) => handleEdit(e, "minBookingLength")}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) => handleEdit(e, "maxBookingLength")}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestPerBooking}
          onBlur={(e) => handleEdit(e, "maxGuestPerBooking")}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleEdit(e, "breakfastPrice")}
          disabled={isEditing}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
