import { FlatMap } from '../../../shared/utils';
import { CalorimeterPurpose } from '../enums/calorimeter-purpose.enum';

export const calorimeterPurposeLabels = new FlatMap([
    { key: CalorimeterPurpose.Breakfast, name: 'PAGES.CALORIMETER.PURPOSE_LABELS.BREAKFAST' },
    { key: CalorimeterPurpose.Lunch, name: 'PAGES.CALORIMETER.PURPOSE_LABELS.LUNCH' },
    { key: CalorimeterPurpose.Dinner, name: 'PAGES.CALORIMETER.PURPOSE_LABELS.DINNER' },
    { key: CalorimeterPurpose.Activity, name: 'PAGES.CALORIMETER.PURPOSE_LABELS.ACTIVITY' },
], 'key');
