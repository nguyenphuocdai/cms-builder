import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { FieldConfigInterface } from "./../../../../../../core/auth";
@Component({
	selector: "app-select",
	template: `
		<div class="form-group kt-form__group">
			<ng-container [ngSwitch]="field.fieldType">
				<ng-container *ngSwitchCase="'Option Set'">
					<mat-form-field [formGroup]="group" class="kt-margin-r-20">
						<mat-label>{{ field.label }}</mat-label>
						<mat-select
							[placeholder]="field.label"
							[formControlName]="field.name"
						>
							<mat-option
								*ngFor="let item of field.options"
								[value]="item.value"
								>{{ item.label }}
							</mat-option>
						</mat-select>
						<mat-icon
							*ngIf="field.description"
							color="primary"
							matSuffix
							matTooltip="{{ field.description }}"
							>help</mat-icon
						>
						<ng-container
							*ngFor="let validation of field.validations"
							ngProjectAs="mat-error"
						>
							<mat-error
								*ngIf="
									group
										.get(field.name)
										.hasError(validation.name)
								"
								>{{ validation.message }}</mat-error
							>
						</ng-container>
					</mat-form-field>
				</ng-container>

				<ng-container *ngSwitchCase="'MultiSelect Option Set'">
					<mat-form-field [formGroup]="group" class="kt-margin-r-20">
						<mat-select
							[placeholder]="field.label"
							[formControlName]="field.name"
							multiple
						>
							<mat-select-trigger>
								{{
									field.name.value ? field.name.value[0] : ""
								}}
								<span
									*ngIf="field.name.value?.length > 1"
									class="example-additional-selection"
								>
									(+{{ field.name.value.length - 1 }}
									{{
										field.name.value?.length === 2
											? "other"
											: "others"
									}})
								</span>
							</mat-select-trigger>
							<mat-option
								*ngFor="let item of field.options"
								[value]="item.value"
								>{{ item.label }}
							</mat-option>
						</mat-select>
						<mat-icon
							*ngIf="field.description"
							color="primary"
							matSuffix
							matTooltip="{{ field.description }}"
							>help</mat-icon
						>
						<ng-container
							*ngFor="let validation of field.validations"
							ngProjectAs="mat-error"
						>
							<mat-error
								*ngIf="
									group
										.get(field.name)
										.hasError(validation.name)
								"
								>{{ validation.message }}</mat-error
							>
						</ng-container>
					</mat-form-field>
				</ng-container>

				<ng-container *ngSwitchCase="'Two Option'">
					<mat-form-field [formGroup]="group" class="kt-margin-r-20">
						<mat-label>{{ field.label }}</mat-label>
						<mat-select
							[placeholder]="field.label"
							[formControlName]="field.name"
							multiple
							(selectionChange)="handleChangeTwoOptions()"
						>
							<mat-option
								*ngFor="let item of field.options"
								[value]="item.value"
								>{{ item.label }}
							</mat-option>
						</mat-select>
						<mat-icon
							*ngIf="field.description"
							color="primary"
							matSuffix
							matTooltip="{{ field.description }}"
							>help</mat-icon
						>
						<ng-container
							*ngFor="let validation of field.validations"
							ngProjectAs="mat-error"
						>
							<mat-error
								*ngIf="
									group
										.get(field.name)
										.hasError(validation.name)
								"
								>{{ validation.message }}</mat-error
							>
						</ng-container>
					</mat-form-field>
				</ng-container>
			</ng-container>
		</div>
	`,
	styles: []
})
export class SelectComponent implements OnInit {
	field: FieldConfigInterface;
	group: FormGroup;
	mySelections: any;
	constructor() {}
	ngOnInit() {}

	handleChangeTwoOptions() {
		if (this.group.controls[this.field.name].value.length <= 2) {
			this.mySelections = this.group.controls[this.field.name].value;
		} else {
			this.group.controls[this.field.name].setValue(this.mySelections);
		}
	}
}
