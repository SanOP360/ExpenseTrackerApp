import Expense from "./Expense";
import { render, screen } from "@testing-library/react";


render(<Expense />);


const listItemElements = screen.queryAllByRole("expense-item");

expect(listItemElements).not.toHaveLength(0);


console.log("Number of list items:", listItemElements.length);

