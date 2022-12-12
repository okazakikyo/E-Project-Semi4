import { defineRule, configure } from "vee-validate";
import {
    required,
} from "@vee-validate/rules";

defineRule("required", required);