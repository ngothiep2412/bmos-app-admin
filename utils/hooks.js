import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAdminPosts } from "../redux/actions/postAction";
import axios from "axios";
import { server } from "../redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAdminBirds } from "../redux/actions/birdAction";
import { getAdminProducts } from "../redux/actions/productAction";
import { Alert } from "react-native";

export const useMessageAndErrorUser = (
  navigation,
  dispatch,
  navigateTo = "login"
) => {
  const { loading, message, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      Alert.alert(
        //title
        "Error",
        //body
        error,
        [
          {
            text: "OK",
            onPress: () => console.log("Yes Pressed"),
          },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
      dispatch({
        type: "clearError",
      });
    }

    if (message) {
      navigation.reset({
        index: 0,
        routes: [{ name: navigateTo }],
      });
      Alert.alert(
        //title
        "Success",
        //body
        message,
        [
          {
            text: "OK",
            onPress: () => console.log("Yes Pressed"),
          },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
      dispatch({
        type: "clearMessage",
      });
    }
  }, [error, message, dispatch]);

  return loading;
};

export const useMessageAndErrorOther = (
  dispatch,
  navigation,
  navigateTo,
  func
) => {
  const { loading, message, error } = useSelector((state) => state.other);

  useEffect(() => {
    if (error) {
      console.log("aaa");
      Alert.alert(
        //title
        "Error",
        //body
        error,
        [
          {
            text: "OK",
            onPress: () => console.log("Yes Pressed"),
          },
        ]

        //clicking out side of alert will not cancel
      );
      dispatch({
        type: "clearError",
      });
    }

    if (message) {
      Alert.alert(
        //title
        "Success",
        //body
        message,
        [
          {
            text: "OK",
            onPress: () => console.log("Yes Pressed"),
          },
        ]

        //clicking out side of alert will not cancel
      );
      dispatch({
        type: "clearMessage",
      });

      navigateTo && navigation.navigate(navigateTo);

      func && dispatch(func());
    }
  }, [error, message, dispatch]);

  return loading;
};

export const useMessageAndErrorPost = (
  dispatch,
  navigation,
  navigateTo,
  func
) => {
  const { loading, message, error } = useSelector((state) => state.post);

  useEffect(() => {
    if (error) {
      Alert.alert(
        //title
        "Error",
        //body
        error,
        [
          {
            text: "OK",
            onPress: () => console.log("Yes Pressed"),
          },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
      dispatch({
        type: "clearError",
      });
    }

    if (message) {
      Alert.alert(
        //title
        "Success",
        //body
        message,
        [
          {
            text: "OK",
            onPress: () => console.log("Yes Pressed"),
          },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
      dispatch({
        type: "clearMessage",
      });

      navigateTo && navigation.navigate(navigateTo);

      func && dispatch(func());
    }
  }, [error, message, dispatch]);

  return loading;
};

export const useMessageAndErrorBird = (
  dispatch,
  navigation,
  navigateTo,
  func
) => {
  const { loading, message, error } = useSelector((state) => state.bird);

  useEffect(() => {
    if (error) {
      Alert.alert(
        //title
        "Error",
        //body
        error,
        [
          {
            text: "OK",
            onPress: () => console.log("Yes Pressed"),
          },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
      dispatch({
        type: "clearError",
      });
    }

    if (message) {
      Alert.alert(
        //title
        "Success",
        //body
        message,
        [
          {
            text: "OK",
            onPress: () => console.log("Yes Pressed"),
          },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
      dispatch({
        type: "clearMessage",
      });

      navigateTo && navigation.navigate(navigateTo);

      func && dispatch(func());
    }
  }, [error, message, dispatch]);

  return loading;
};

export const useMessageAndErrorProduct = (
  dispatch,
  navigation,
  navigateTo,
  func
) => {
  const { loading, message, error } = useSelector((state) => state.product);

  useEffect(() => {
    if (error) {
      Alert.alert(
        //title
        "Error",
        //body
        error,
        [
          {
            text: "OK",
            onPress: () => console.log("Yes Pressed"),
          },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
      dispatch({
        type: "clearError",
      });
    }

    if (message) {
      Alert.alert(
        //title
        "Success",
        //body
        message,
        [
          {
            text: "OK",
            onPress: () => console.log("Yes Pressed"),
          },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
      dispatch({
        type: "clearMessage",
      });

      navigateTo && navigation.navigate(navigateTo);

      func && dispatch(func());
    }
  }, [error, message, dispatch]);

  return loading;
};

export const useAdminPosts = (dispatch, isFocused) => {
  const { posts, error, loading } = useSelector((state) => state.post);

  useEffect(() => {
    if (error) {
      Alert.alert(
        //title
        "Error",
        //body
        error,
        [
          {
            text: "OK",
            onPress: () => console.log("Yes Pressed"),
          },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
      dispatch({
        type: "clearError",
      });
    }

    dispatch(getAdminPosts());
  }, [dispatch, isFocused, error]);

  return {
    posts,
    loading,
  };
};

export const useAdminBird = (dispatch, isFocused) => {
  const { birds, error, loading } = useSelector((state) => state.bird);

  useEffect(() => {
    if (error) {
      Alert.alert(
        //title
        "Error",
        //body
        error,
        [
          {
            text: "OK",
            onPress: () => console.log("Yes Pressed"),
          },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
      dispatch({
        type: "clearError",
      });
    }

    dispatch(getAdminBirds());
  }, [dispatch, isFocused, error]);

  return {
    birds,
    loading,
  };
};

export const useAdminProducts = (dispatch, isFocused) => {
  const { products, error, loading } = useSelector((state) => state.product);

  useEffect(() => {
    if (error) {
      Alert.alert(
        //title
        "Error",
        //body
        error,
        [
          {
            text: "OK",
            onPress: () => console.log("Yes Pressed"),
          },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
      dispatch({
        type: "clearError",
      });
    }

    dispatch(getAdminProducts());
  }, [dispatch, isFocused, error]);

  return {
    products,
    loading,
  };
};

export const useGetOrders = (setLoading, isFocused) => {
  const [staffs, setStaffs] = useState([]);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(`${server}/staff/all`, { headers });
        setStaffs(response.data.data);
        setLoading(false);
      } catch (error) {
        Alert.alert(
          //title
          "Error",
          //body
          error.response.data.message,
          [
            {
              text: "OK",
              onPress: () => console.log("Yes Pressed"),
            },
          ],
          { cancelable: false }
          //clicking out side of alert will not cancel
        );
        setLoading(false);
      }
    };

    fetchData();
  }, [isFocused]);

  return {
    staffs,
  };
};

export const useSetMealProducts = (setProducts, isFocused) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(`${server}/product`, { headers });
        setProducts(response.data.data);
      } catch (error) {
        Alert.alert(
          //title
          "Error",
          //body
          error.response.data.message,
          [
            {
              text: "OK",
              onPress: () => console.log("Yes Pressed"),
            },
          ],
          { cancelable: false }
          //clicking out side of alert will not cancel
        );
      }
    };

    fetchData();
  }, [isFocused]);
};

export const useSetMealBirds = (setProducts, isFocused) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(`${server}/bird`, { headers });
        setProducts(response.data.data);
      } catch (error) {
        Alert.alert(
          //title
          "Error",
          //body
          error.response.data.message,
          [
            {
              text: "OK",
              onPress: () => console.log("Yes Pressed"),
            },
          ],
          { cancelable: false }
          //clicking out side of alert will not cancel
        );
      }
    };

    fetchData();
  }, [isFocused]);
};

export const useSetCategory = (setCategories, isFocused) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(`${server}/category`, { headers });
        setCategories(response.data.data);
      } catch (error) {
        Alert.alert(
          //title
          "Error",
          //body
          error.response.data.message,
          [
            {
              text: "OK",
              onPress: () => console.log("Yes Pressed"),
            },
          ],
          { cancelable: false }
          //clicking out side of alert will not cancel
        );
      }
    };

    fetchData();
  }, [isFocused]);
};
