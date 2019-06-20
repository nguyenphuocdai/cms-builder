import { Component, OnInit, Inject, EventEmitter, Output } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
	selector: "kt-management-modal",
	templateUrl: "./management-modal.component.html",
	styleUrls: ["./management-modal.component.scss"]
})
export class ManagementModalComponent implements OnInit {
	isSubmit: boolean = false;
	@Output() submitClicked = new EventEmitter<any>();
	constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
	hasMultiple: boolean = false;
	ngOnInit() {}

	/**
	 * Data EventEmitter Dynamic Form
	 * @param value
	 */
	dynamicFormSubmit(value: any) {
		if (value.hasOwnProperty("Date Picker") === true) {
			let result = value["Date Picker"].toISOString();
			value["Date Picker"] = new Date(result).toLocaleDateString();
		}
		console.log(value);
		this.isSubmit = true;
		// temp
		setTimeout(() => {
			let obj = {
				hasMultiple: this.hasMultiple,
				value: value
			};
			this.submitClicked.emit(obj);
			this.isSubmit = false;
		}, 3000);
	}
}
