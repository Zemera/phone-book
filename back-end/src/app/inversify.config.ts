import "reflect-metadata";
import { Container } from "inversify";
import {TYPES} from "../config/constant/types";

import { ContactRepository } from "./repository/contact.repository";

let phoneBookContainer = new Container();

phoneBookContainer.bind<ContactRepository>(TYPES.ContactRepository).to(ContactRepository);

export {phoneBookContainer};
