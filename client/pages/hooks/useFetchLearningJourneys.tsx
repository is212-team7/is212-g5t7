import { Dispatch, SetStateAction } from 'react';
import { LearningJourney } from '../api/learningJourneys';
import { Staff } from '../api/staffs';

interface useFetchLearningJourneyssProp {
    setLearningJourneys: Dispatch<
        SetStateAction<LearningJourney[] | null | undefined>
    >;
    staff: Staff | undefined;
}

const useFetchLearningJourneys = ({
    setLearningJourneys,
    staff,
}: useFetchLearningJourneyssProp) => {
    if (staff == null) return null;

    return () => {
        fetch('/api/learningJourneys/staff/' + staff.id, { method: 'GET' })
            .then((response) => response.json())
            .then((result: LearningJourney[]) => {
                console.log({ result });
                if (Array.isArray(result)) {
                    if (result.length === 0) {
                        setLearningJourneys(null);
                        return;
                    }
                    setLearningJourneys(result);
                }
            })
            .catch((e) => console.log(e));
    };
};

export default useFetchLearningJourneys;
