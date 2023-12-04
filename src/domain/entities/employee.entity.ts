export class EmployeeEntity {
    public Id: string;
    public Name: string;
    public Age: number;
    public JobTitle: string;

    constructor(id: string, name: string, age: number, jobTitle: string) {
        this.Age = age;
        this.Id = id;
        this.JobTitle = jobTitle;
        this.Name = name;
    }
}