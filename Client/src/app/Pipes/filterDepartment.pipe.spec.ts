import { FilterDepartmentPipe } from './filterDepartment.pipe';

describe('FilterPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterDepartmentPipe();
    expect(pipe).toBeTruthy();
  });
});
