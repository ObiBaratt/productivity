import { Task } from "@prisma/client";

export default function sortCards(cardStatus: string, objArr: Task[]) {
    if (Array.isArray(objArr)) {
        return objArr.filter(obj => {
            return obj.category === cardStatus;
        });
    }
    else {
        return undefined;
    }
}
