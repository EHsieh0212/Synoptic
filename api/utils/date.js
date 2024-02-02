import moment from 'moment';

export const getSimpleDateFromUTC = origDate => {
    if (origDate === null || origDate === undefined) {
        return;
      } else {
        return moment(origDate).format('YYYY-MM');
      }

};
