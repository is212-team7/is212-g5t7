import { Dispatch, SetStateAction } from 'react';
import { LearningJourneyData } from '../api/learningJourneys';
import useSessionStorage from './useSessionStorage';

interface useFetchLearningJourneyssProp {
    setLearningJourneys: Dispatch<
        SetStateAction<LearningJourneyData[] | null | undefined>
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
            .then((result: LearningJourneyData[]) => {
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
