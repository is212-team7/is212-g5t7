import { Dispatch, SetStateAction } from 'react';
import { LearningJourney } from '../api/learningJourneys';
import useSessionStorage from './useSessionStorage';

interface useFetchLearningJourneyssProp {
    setLearningJourneys: Dispatch<
        SetStateAction<LearningJourney[] | null | undefined>
    >;
}

const useFetchLearningJourneys = ({
    setLearningJourneys,
}: useFetchLearningJourneyssProp) => {
    const staff = useSessionStorage();

    console.log({ staff });
    if (staff == null) return null;

    return () => {
        fetch('/api/learningJourneys/' + staff.id, { method: 'GET' })
            .then((response) => response.json())
            .then((result: LearningJourney[]) => {
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
