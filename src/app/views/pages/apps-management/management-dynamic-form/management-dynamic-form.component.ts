import { FieldConfigInterface } from "./../../../../shared/_model-app/field.interface";
import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges
} from "@angular/core";
import {
	FormGroup,
	FormBuilder,
	Validators,
	FormControl
} from "@angular/forms";
@Component({
	selector: "kt-management-dynamic-form",
	templateUrl: "./management-dynamic-form.component.html",
	styleUrls: ["./management-dynamic-form.component.scss"]
})
export class ManagementDynamicFormComponent implements OnInit, OnChanges {
	@Input() fields: FieldConfigInterface[] = [];
	@Output() submit: EventEmitter<any> = new EventEmitter<any>();
	@Input() data: any;
	form: FormGroup;

	get value() {
		if (this.form === undefined) {
			return;
		}
		return this.form.value;
	}

	/**
	 * DI FormBuilder
	 * @param fb
	 */
	constructor(private fb: FormBuilder) {}

	/**
	 * CreateControl
	 */
	ngOnInit() {
		this.form = this.createControl();

		if (this.data) {
			this.bindingDataEdit();
		}
	}

	bindingDataEdit() {
		let objControls = this.form.controls;
		let dataInput = this.data;
		let form = this.form;
		for (let k in objControls) {
			if (objControls.hasOwnProperty(k)) {
				Object.keys(this.data).forEach(function(keyData) {
					if (k === keyData) {
						form.controls[k].setValue(dataInput[k]);
					}
				});
			}
		}
	}

	/**
	 * Lifecycle Hook
	 * @param changes
	 */
	ngOnChanges(changes: SimpleChanges) {
		if (changes.fields.currentValue !== changes.fields.previousValue) {
			this.form = this.createControl();
		}
	}

	/**
	 * Submit Form
	 * @param event
	 */
	onSubmit(event: Event) {
		event.preventDefault();
		event.stopPropagation();
		if (this.form.valid) {
			this.submit.emit(this.form.value);
			// case submit clear data temp hard code
			setTimeout(() => {
				this.form.reset();
			}, 3000);
		} else {
			this.validateAllFormFields(this.form);
		}
	}

	/**
	 * CreateFormControl
	 */
	createControl() {
		const group = this.fb.group({});
		this.fields.forEach(field => {
			if (field.type === "button") {
				return;
			}
			const control = this.fb.control(
				field.value,
				this.bindValidations(field.validations || [])
			);
			group.addControl(field.name, control);
		});
		return group;
	}

	/**
	 * BindValidation
	 * @param validations
	 */
	bindValidations(validations: any) {
		if (validations.length > 0) {
			const validList = [];
			validations.forEach(valid => {
				if (
					valid.name === "required" &&
					valid.validator === undefined
				) {
					let obj = new FormControl("", [Validators.required]);
					validList.push(obj.validator);
				} else {
					validList.push(valid.validator);
				}
			});
			return Validators.compose(validList);
		}
		return null;
	}

	/**
	 * Validate Field form
	 */
	validateAllFormFields(formGroup: FormGroup) {
		Object.keys(formGroup.controls).forEach(field => {
			const control = formGroup.get(field);
			control.markAsTouched({ onlySelf: true });
		});
	}

	/**
	 * Delete Field
	 * @param event
	 */
	onDelete(event) {
		if (event) {
			this.fields = event;
			this.ngOnInit();
		}
	}
}
