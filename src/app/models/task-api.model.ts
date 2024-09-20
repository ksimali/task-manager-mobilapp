export interface TaskAPI {
    taskUid: string,
    assignedToName: string,
    assignedToUid: string,
    createdByName: string,
    createdByUid: string,
    description: string,
    done: boolean
}