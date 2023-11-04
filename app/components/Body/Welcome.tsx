interface Props {
  actionData: ActionData,
  formType: string,
}

type ActionData = {
  formError?: string;
  fieldErrors?: {
    username: string | undefined;
    password: string | undefined;
  };
  fields?: {
    loginType: string;
    username: string;
    password: string;
  };
};


export const Welcome = (props: Props) => {

  return (
    <div>
      
    </div>
  )
}