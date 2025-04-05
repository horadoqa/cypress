import { faker, clone, crudStorage} from "..sup"

describe("CRUD", () => {
    it("API TESTING", () => {
        cy.crud("crud.json")
    })
})
