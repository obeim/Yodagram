import React from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeScreen from "./components/screens/HomeScreen";
import ProfileScreen from "./components/screens/ProfileScreen";
import { AuthProvider } from "./context/context";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import NotFound from "./components/NotFound";
import PostCreate from "./components/screens/PostCreate";
const App = () => (
  <AuthProvider>
    <Router>
      <Header />

      <div className='h-20'></div>
      <Switch>
        <Route path='/' component={HomeScreen} exact />
        <Route path='/login' component={LoginScreen} />
        <Route path='/register' component={RegisterScreen} />
        <Route path='/users/:id' component={ProfileScreen} />
        <Route path='/createpost' component={PostCreate} />
        <Route path='*' exact component={NotFound} />
      </Switch>
      <div className='h-96'></div>
    </Router>
  </AuthProvider>
);

export default App;
