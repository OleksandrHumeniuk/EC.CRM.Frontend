import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule, NgOptimizedImage } from "@angular/common";

import {
  Client,
  LocationResponse,
  NonProfessionalInterestResponse,
  SkillResponse,
  StudentApplicationRequest,
  StudyFieldResponse
} from "../../services/proxies";
import { AutocompleteComponent } from "../../components/autocomplete/autocomplete.component";
import { SelectComponent } from "../../components/select/select.component";
import { ButtonComponent } from "../../components/button/button.component";
import { Option } from "../../types/options";

export type StudentFormValues = StudentApplicationRequest & { description: string | undefined };

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, AutocompleteComponent, ReactiveFormsModule, SelectComponent, ButtonComponent],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss'
})
export class StudentFormComponent implements OnInit , OnChanges {
  skills: SkillResponse[] = [];
  interests: NonProfessionalInterestResponse[] = [];
  locations: LocationResponse[] = [];
  studyFields: StudyFieldResponse[] = [];

  @Input() variant: 'request' | 'student' = 'request';
  @Input() initialValues: StudentFormValues | undefined = undefined;
  @Output() formSubmit = new EventEmitter<StudentFormValues>();

  requestFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    skillsUids: new FormControl([]),
    nonProffesionalInterestsUids: new FormControl([]),
    desiredStudyFieldUid: new FormControl('', [Validators.required]),
    locationUid: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  private previousValues: StudentFormValues | undefined;

  constructor(private client: Client) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialValues'] && this.initialValues && this.haveInitialValuesChanged(this.initialValues, this.previousValues)) {
      this.updateFormValues();
      this.previousValues = { ...this.initialValues };
    }
  }
  
  private haveInitialValuesChanged(newValues: StudentFormValues, oldValues: StudentFormValues | undefined): boolean {
    return JSON.stringify(newValues) !== JSON.stringify(oldValues);
  }

  private updateFormValues(): void {
    this.requestFormGroup.setValue({
      name: this.initialValues?.name ?? '',
      email: this.initialValues?.email ?? '',
      phoneNumber: this.initialValues?.phoneNumber ?? '',
      // @ts-ignore
      skillsUids: this.initialValues?.skillsUids ?? [],
      // @ts-ignore
      nonProffesionalInterestsUids: this.initialValues?.nonProffesionalInterestsUids ?? [],
      desiredStudyFieldUid: this.initialValues?.desiredStudyFieldUid ?? '',
      locationUid: this.initialValues?.locationUid ?? '',
      description: this.initialValues?.description ?? '',
    });
  }

  get locationOptions(): Option[] {
    return this.locations.map(location => ({
      id: String(location.uid),
      title: String(location.city)
    }));
  }

  get studyFieldOptions(): Option[] {
    return this.studyFields.map(studyField => ({
      id: String(studyField.uid),
      title: String(studyField.name)
    }));
  }

  get skillOptions(): Option[] {
    return this.skills.map(skill => ({
      id: String(skill.uid),
      title: String(skill.name)
    }));
  }

  get interestOptions(): Option[] {
    return this.interests.map(interest => ({
      id: String(interest.uid),
      title: String(interest.name)
    }));
  }

  get selectedSkillOptions(): Option[] {
    // @ts-ignore
    return this.skillOptions.filter(skill => this.requestFormGroup.get('skillsUids')?.value?.includes(skill.id));
  }

  get selectedInterestOptions(): Option[] {
    // @ts-ignore
    return this.interestOptions.filter(interest => this.requestFormGroup.get('nonProffesionalInterestsUids')?.value?.includes(interest.id));
  }

  handleAddSkill = (skill: string) => {
    const currentSkills = this.requestFormGroup.get('skillsUids')?.value as string[];

    // @ts-ignore
    this.requestFormGroup.get('skillsUids')?.setValue([...currentSkills, skill]);
  }

  handleRemoveSkill = (skill: string) => {
    const currentSkills = this.requestFormGroup.get('skillsUids')?.value as string[];

    // @ts-ignore
    this.requestFormGroup.get('skillsUids')?.setValue(currentSkills.filter(currentSkill => currentSkill !== skill));
  }

  handleAddInterest = (interest: string) => {
    const currentInterests = this.requestFormGroup.get('nonProffesionalInterestsUids')?.value as string[];

    // @ts-ignore
    this.requestFormGroup.get('nonProffesionalInterestsUids')?.setValue([...currentInterests, interest]);
  }

  handleRemoveInterest = (interest: string) => {
    const currentInterests = this.requestFormGroup.get('nonProffesionalInterestsUids')?.value as string[];

    // @ts-ignore
    this.requestFormGroup.get('nonProffesionalInterestsUids')?.setValue(currentInterests.filter(currentInterest => currentInterest !== interest));
  }

  ngOnInit() {
    this.client.skills().subscribe(skills => this.skills = skills);
    this.client.nonProfessionalInterests().subscribe(interests => this.interests = interests);
    this.client.locations().subscribe(locations => this.locations = locations);
    this.client.studyFields().subscribe(studyFields => this.studyFields = studyFields);
  }

  handleSubmit = () => {
    if (this.requestFormGroup.valid) {
      this.formSubmit.emit(this.requestFormGroup.value as StudentFormValues);
    }
  }
}
