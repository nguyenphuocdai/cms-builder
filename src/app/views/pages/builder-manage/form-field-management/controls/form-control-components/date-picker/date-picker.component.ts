import { TypesUtilsService } from "./../../../../../../../core/_base/crud/utils/types-utils.service";
import { KtSnackBarService } from "../../../../../../../core/_base/layout/services/kt-snack-bar.service";
import {
	Component,
	OnInit,
	Inject,
	Input,
	Output,
	EventEmitter
} from "@angular/core";
import { MatDialogRef, MatDatepickerInputEvent } from "@angular/material";
import {
	FormControl,
	Validators,
	FormGroup,
	FormBuilder
} from "@angular/forms";
import {
	DialogRefInterface,
	FieldConfigInterface
} from "../../../../../../../core/auth";
import { ModalDialogComponent } from "../../modal-dialog/modal-dialog.component";

@Component({
	selector: "kt-date-picker",
	templateUrl: "./date-picker.component.html",
	styleUrls: ["./date-picker.component.scss"]
})
export class DatePickerComponent implements OnInit {
	@Input("dialogRefData") dialogRefData: DialogRefInterface;
	@Input("valueEdit") valueEdit: FieldConfigInterface;
	@Output("datePickerComponentSubmit") submitForm = new EventEmitter<
		object
	>();

	rfDatePicker: FormGroup;
	optionDefault: string = "button";
	isSubmit: boolean = false;
	events: string[] = [];

	constructor(
		private _dialogRef: MatDialogRef<ModalDialogComponent>,
		private _fbField: FormBuilder,
		private _snackBarService: KtSnackBarService,
		private _typesUtilsService: TypesUtilsService
	) {}

	ngOnInit() {
		this.createForm();
		if (this.valueEdit) {
			this.rfDatePicker.controls["name"].setValue(this.valueEdit.name);
			this.rfDatePicker.controls["database"].setValue(this.valueEdit.database);
			this.rfDatePicker.controls["required"].setValue(this.valueEdit.required);
			this.rfDatePicker.controls["errorMessage"].setValue(
				this.valueEdit.errorMessage
			);
			this.rfDatePicker.controls["security"].setValue(this.valueEdit.security);
			this.rfDatePicker.controls["tracking"].setValue(this.valueEdit.tracking);
			this.rfDatePicker.controls["fieldType"].setValue(
				this.valueEdit.fieldType
			);
			this.dialogRefData.type = this.valueEdit.type;
			this.dialogRefData.valueView = this.valueEdit.inputType;

			if (this.valueEdit.validations.length !== 0) {
				this.valueEdit.validations.forEach((element, index) => {
					if (element.name === "required") {
						this.rfDatePicker.controls["errorMessage"].setValue(
							element.message
						);
					}
				});
			}
		}
	}

	/**
	 * create form builder
	 */
	createForm() {
		this.rfDatePicker = this._fbField.group({
			name: ["", Validators.required],
			required: new FormControl(false),
			errorMessage: [""],
			security: new FormControl(false),
			tracking: new FormControl(false),
			fieldType: ["datepicker", Validators.required],
			database: ["", Validators.required]
		});
	}

	/**
	 * Submit @Output
	 */
	onSubmit(event) {
		this.isSubmit = true;
		this._dialogRef.disableClose = true;
		if (this.rfDatePicker.invalid) {
			this.isSubmit = false;
			return;
		}

		setTimeout(() => {
			let mergedObj: FieldConfigInterface = this.onBuildData();
			this._snackBarService.openSnackBar(
				"Add new field successfully !",
				5000
			);
			this.isSubmit = false;
			this.submitForm.emit(mergedObj);
		}, 3000);
	}

	/**
	 * build data fro @Output
	 */
	onBuildData() {
		let label = this.rfDatePicker.controls["name"].value;
		let type = this.dialogRefData.type;
		let inputType = this.dialogRefData.valueView;
		let isRequired = this.rfDatePicker.controls["required"].value;
		let errorMessage = this.rfDatePicker.controls["errorMessage"].value;
		let isSecurity = this.rfDatePicker.controls["security"].value;
		let isTracking = this.rfDatePicker.controls["tracking"].value;
		let fieldType = this.rfDatePicker.controls["fieldType"].value;
		let database = this.rfDatePicker.controls["database"].value;

		let mergedObj: FieldConfigInterface = {
			id:
				this.valueEdit !== undefined
					? this.valueEdit.id
					: this._typesUtilsService.makeid(),
			type: type,
			label: label,
			inputType: inputType,
			name: label,
			security: isSecurity,
			tracking: isTracking,
			fieldType: fieldType,
			required: isRequired,
			database: database,
			validations: []
		};
		if (isRequired === true) {
			let objValidator = {
				name: "required",
				validator: Validators.required,
				message: errorMessage
			};
			mergedObj.validations.push(objValidator);
		}

		return mergedObj;
	}
	addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
		this.events.push(`${type}: ${event.value}`);
	}
	bindingDatabase() {
		let value = this.rfDatePicker.controls["name"].value;
		this.rfDatePicker.controls["database"].setValue(
			this._typesUtilsService.formatDatabaseInput(value)
		);
	}
}
