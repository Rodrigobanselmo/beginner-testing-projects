const initialState = {
    name:'',
    workoutDays:[], // 1-7
    level:'', // beginner, intermediate, advanced
    lastWorkout:'', // hash
    myWorkouts:[],
    dailyProgress:['2020-01-07', '2020-10-03'] // para poder deixar o passado quando mudar data é preciso criar dias de treino nao realizados
  };
  
  export default (state = initialState, action) => {

    switch (action.type) {
      case 'SET_NAME':
        return {...state, name:action.payload.name};
        break;
    }
      
  
    return state;
  };