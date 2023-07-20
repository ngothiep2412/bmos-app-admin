import axios from "axios";
import { server, serverUrl } from "../store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const updateMealProduct =
  (
    id,
    status = "true",
    title,
    birdId = "2e5d8f00-14f0-4333-b1b9-6739cbaf4478",
    description,
    image,
    products
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "updateMealProductRequest",
      });

      const token = await AsyncStorage.getItem("token");
      const { data } = await axios.put(
        `${server}/meal/update}`,
        {
          id: id,
          status: status,
          title: title,
          description: description,
          birdId: birdId,
          image: image,
          products: products,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      dispatch({
        type: "updateMealProductSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updateMealProductFail",
        payload: error.response.data.message,
      });
    }
  };

export const processOrder = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "processOrderRequest",
    });

    const token = await AsyncStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.delete(
      `${server}/staff/disable/${id}`,
      {},
      {
        headers,
      }
    );

    dispatch({
      type: "processOrderSuccess",
      payload: response.data.message,
    });
  } catch (error) {
    dispatch({
      type: "processOrderFail",
      payload: error.response.data.message,
    });
  }
};

export const getOrderDetail = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getOrderDetailRequest",
    });

    const token = await AsyncStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.get(`${server}/order/${id}`, {
      withCredentials: true,
      headers: headers,
    });

    dispatch({
      type: "getOrderDetailSuccess",
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: "getOrderDetailFail",
      payload: error.response.data.message,
    });
  }
};

export const updatePassword =
  (oldPassword, newPassword, confirmNewPassword) => async (dispatch) => {
    try {
      dispatch({
        type: "updatePasswordRequest",
      });
      const token = await AsyncStorage.getItem("token");

      const { data } = await axios.post(
        `${server}/account/change-password`,
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmNewPassword: confirmNewPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      dispatch({
        type: "updatePasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updatePasswordFail",
        payload: "Check your password",
      });
    }
  };

export const loadOrder = () => async (dispatch) => {
  try {
    dispatch({
      type: "loadOrderRequest",
    });

    const token = await AsyncStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const { data } = await axios.get(`${server}/order/store`, { headers });

    dispatch({
      type: "loadOrderSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "loadOrderFail",
      payload: error.response.data.message,
    });
  }
};

export const updateProfile =
  (fullName, dobString, phoneNumber, id, myForm) => async (dispatch) => {
    try {
      dispatch({
        type: "updateProfileRequest",
      });

      const token = await AsyncStorage.getItem("token");

      const data1 = await axios.post(`${serverUrl}/user/uploadimg`, myForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      const avtar = data1.data.url;

      const { data } = await axios.put(
        `${server}/account/${id}`,
        {
          fullName: fullName,
          dob: dobString,
          phoneNumber: phoneNumber,
          avatar: avtar,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      dispatch({
        type: "updateProfileSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updateProfileFail",
        payload: error.response.data.message,
      });
    }
  };

export const registerStaff =
  (
    fullName,
    dobString,
    phoneNumber,
    myForm,
    email,
    password,
    confirmPassword,
    identityNumber
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "registerStaffRequest",
      });

      const data1 = await axios.post(`${serverUrl}/user/uploadimg`, myForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      const avtar = data1.data.url;

      const token = await AsyncStorage.getItem("token");

      const { data } = await axios.post(
        `${server}/auth/register-staff`,
        {
          fullName: fullName,
          dob: dobString,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
          phoneNumber: phoneNumber,
          avatar: avtar,
          identityNumber: identityNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      dispatch({
        type: "registerStaffSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "registerStaffFail",
        payload: "Register Fail",
      });
    }
  };
