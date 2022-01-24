import selectNoFilterInPlace from '../../selectors/noFilterInPlace';
import { filters, altFilters, noFilters } from '../fixtures/filters';

test('should return true if no filters in place', ()=>{
    const noFilterInPlace = selectNoFilterInPlace(noFilters);
    expect(noFilterInPlace).toBe(true);
});

test('should return false if there is any filter in place', () => {
    const noFilterInPlace = selectNoFilterInPlace(altFilters);
    expect(noFilterInPlace).toBe(false);
});