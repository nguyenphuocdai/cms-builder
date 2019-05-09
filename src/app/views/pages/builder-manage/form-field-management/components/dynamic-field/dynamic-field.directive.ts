import {
	ComponentFactoryResolver,
	ComponentRef,
	Directive,
	Input,
	OnInit,
	ViewContainerRef
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "./../../../../../../core/auth";
import { InputComponent } from "../input/input.component";
import { ButtonComponent } from "../button/button.component";
import { SelectComponent } from "../select/select.component";
import { DateComponent } from "../date/date.component";
import { RadiobuttonComponent } from "../radiobutton/radiobutton.component";
import { CheckboxComponent } from "../checkbox/checkbox.component";

const componentMapper = {
	input: InputComponent,
	button: ButtonComponent,
	select: SelectComponent,
	date: DateComponent,
	radiobutton: RadiobuttonComponent,
	checkbox: CheckboxComponent
};
@Directive({
	selector: "[dynamicField]"
})
export class DynamicFieldDirective implements OnInit {
	@Input() field: FieldConfig;
	@Input() group: FormGroup;
	componentRef: any;
	constructor(
		private resolver: ComponentFactoryResolver,
		private container: ViewContainerRef
	) {}
	ngOnInit() {
		// console.log(this.field);
		// this.field.regConfig.forEach(element => {
		// 	if (
		// 		this.capitalizeFirstLetter(element.type) ===
		// 		componentMapper.input.name
		// 	) {
		// 		const factory = this.resolver.resolveComponentFactory(
		// 			componentMapper[element.type]
		// 		);
		// 		this.componentRef = this.container.createComponent(factory);
		// 		this.componentRef.instance.field = element;
		// 		this.componentRef.instance.group = this.group;
		// 		return;
		// 	}
		// });
		const factory = this.resolver.resolveComponentFactory(
			componentMapper[this.field.type]
		  );
		  this.componentRef = this.container.createComponent(factory);
		  this.componentRef.instance.field = this.field;
		  this.componentRef.instance.group = this.group;
	}
	capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1) + "Component";
	}
}