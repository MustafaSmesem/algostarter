import {createStore} from 'vuex';

export const store = createStore({
    state() {
        return {
            sortArrayElements: [
                {index: 0, value: 5},
                {index: 1, value: 1},
                {index: 2, value: 9},
                {index: 3, value: 2},
                {index: 4, value: 0},
                {index: 5, value: 7},
                {index: 6, value: 3}
            ],
            sortArrayLength: 7,
            isSorting: false,
            currentLine: -1,
            i: 'undefined',
            j: 'undefined',
            temp: 'undefined',
            simulationSpeed: 1
        }
    },
    mutations: {
        pushSortArrayElement (state) {
            if (state.sortArrayLength < 10) {
                state.sortArrayElements.push({
                    index: state.sortArrayLength,
                    value: 0
                })
                state.sortArrayLength ++;
            }
        },
        updateSortArrayElementValue (state, {index, value}) {
            state.sortArrayElements[index].value = value;
        },
        swapArrayElements(state, {idx1, idx2}) {
            const el1 = state.sortArrayElements.find(e => e.index === idx1);
            const el2 = state.sortArrayElements.find(e => e.index === idx2);
            el1.index = idx2;
            el2.index = idx1;
        },
        insertionSort(state) {
            for (let i = 0; i < state.sortArrayLength -1 ; i++) {
                for (let j = i + 1; j < state.sortArrayLength; j++) {
                    if (state.sortArrayElements[i].value < state.sortArrayElements[j].value) {
                        const el1 = state.sortArrayElements.find(e => e.index === i);
                        const el2 = state.sortArrayElements.find(e => e.index === j);
                        el1.index = i;
                        el2.index = j;
                    }
                }
            }
            setTimeout(function () {
                state.isSorting = false;
            }, 1000);
        },
        removeSortArrayElement(state, index) {
            state.sortArrayElements.splice(index, 1);
            state.sortArrayLength--;
            for (let i = index; i < state.sortArrayLength ; i++) {
                state.sortArrayElements[i].index--;
            }
        }
    }
});
