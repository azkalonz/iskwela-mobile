import { IonAvatar, IonIcon } from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
import { useStoreState } from "../redux/store";

export default function UserAvatar(props: {
  pic?: string;
  size?: number;
  slot?: string;
}) {
  const { info } = useStoreState((states) => states.userStorage);
  const avatar = props.pic || info?.preferences?.profile_picture || (
    <IonIcon
      src={personCircleOutline}
      style={{ width: "100%", height: "100%", background: "#fff" }}
    />
  );

  return (
    <IonAvatar
      {...(props.slot ? { slot: props.slot } : {})}
      style={{ height: props.size || 30, width: props.size || 30 }}
    >
      {avatar}
    </IonAvatar>
  );
}
