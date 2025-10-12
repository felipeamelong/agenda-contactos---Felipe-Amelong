import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupListItem } from './group-list-item';

describe('GroupListItem', () => {
  let component: GroupListItem;
  let fixture: ComponentFixture<GroupListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupListItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupListItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
