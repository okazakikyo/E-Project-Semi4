import { defineRule, configure } from "vee-validate";
import {
    required,
    confirmed,
    email
} from "@vee-validate/rules";
import { default as en } from "@/vee-validate/en.json";
import { localize, setLocale } from "@vee-validate/i18n";

defineRule("confirmed", confirmed);
defineRule("required", required);
defineRule("email", email);

configure({
    generateMessage: localize({
        en: {
            messages: en.messages,
            names: {
                userName: "User Name",
                password: "Password",
                password_conifrm: "Password confirm",
            }
        }
    })
})

setLocale("en");