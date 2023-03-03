import { CallTypeOptions } from "../dtos/CallDTO";
import { ItemProps } from "../pages/Activity/routeComponents/ActivityItem";

export function handleSelectItemInfo(call_type?: CallTypeOptions): ItemProps {
  switch (call_type) {
    case "answered":
      return { icon: "phone-forwarded", color: "secondary", text: "Call with" };
    case "missed":
      return { icon: "phone-incoming", color: "primary", text: "Missed from" };
    case "voicemail":
      return { icon: "voicemail", color: "electricBlue", text: "Voicemail from" };
    default:
      return { icon: "phone", color: "textLight", text: "Call to" };
  }
}
