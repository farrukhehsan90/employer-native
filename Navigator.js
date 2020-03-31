import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import EmployeeList from "./src/components/employee-list";
import EmployeeDetail from "./src/components/employee-detail";
import Login from "./src/components/login";
import Auth from "./src/components/auth";
import AddEmployee from "./src/components/add-employee";

const Stack = createStackNavigator(); // Stack based Navigator

// Navigator Component for handling routes using react-navigation
const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ header: () => {} }}
          name="Auth"
          component={Auth}
        />
        <Stack.Screen
          options={{ header: () => {} }}
          name="Login"
          component={Login}
        />

        <Stack.Screen
          options={{
            headerTitle: "Your Employees",
            headerTitleAlign: "center"
          }}
          name="Employees"
          component={EmployeeList}
        />
        <Stack.Screen
          options={{
            headerTitle: "Add an Employee",
            headerTitleAlign: "center"
          }}
          name="AddEmployee"
          component={AddEmployee}
        />
        <Stack.Screen
          options={({ route }) => ({
            title: `# ${route.params.item && route.params.item.id}`,
            headerTitleAlign: "center"
          })}
          name="Detail"
          component={EmployeeDetail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
