import { defineRule, configure } from "vee-validate";
import {
    required,
    confirmed,
    email,
    min,
} from "@vee-validate/rules";
import { default as en } from "@/vee-validate/en.json";
import { localize, setLocale } from "@vee-validate/i18n";

defineRule("confirmed", confirmed);
defineRule("required", required);
defineRule("email", email);
defineRule("min", min);

configure({
    generateMessage: localize({
        en: {
            messages: en.messages,
            names: {
                userName: "User Name",
                password: "Password",
                password_conifrm: "Password confirm",
                roomName: "Room name",
                capacity: "Capacity",
                start_date: "Start date",
                end_date: "End date",
                email: "Email",
                name: "Name",
                phone: "Phone number",
                birthday: "Birthday",
                role: "Role"
            }
        }
    })
})

setLocale("en");