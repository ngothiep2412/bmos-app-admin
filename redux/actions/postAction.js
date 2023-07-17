import axios from "axios";
import { server, serverUrl } from "../store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAdminPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAdminPostsRequest",
    });

    // Get token
    const token = await AsyncStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.get(`${server}/news`, {
      withCredentials: true,
      headers: headers,
    });

    dispatch({
      type: "getAdminPostsSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getAdminPostsFail",
      payload: error.response.data.message,
    });
  }
};

export const getPostDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getPostDetailsRequest",
    });

    const token = await AsyncStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.get(`${server}/news/${id}`, {
      withCredentials: true,
      headers: headers,
    });

    dispatch({
      type: "getPostDetailsSuccess",
      payload: data.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "getPostDetailsFail",
      payload: error.response.data.message,
    });
  }
};

export const addPost =
  (title, description, name, myForm) => async (dispatch) => {
    console.log(myForm);
    try {
      dispatch({
        type: "addPostRequest",
      });

      // Get token
      const token = await AsyncStorage.getItem("token");
      const data1 = await axios.post(`${serverUrl}/user/uploadimg`, myForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      const images = data1.data.url;

      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const { data } = await axios.post(
        `${server}/news/create`,
        {
          title: title,
          desc: description,
          name: name,
          image: images,
        },
        {
          withCredentials: true,
          headers: headers,
        }
      );

      dispatch({
        type: "addPostSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "addPostFail",
        payload: error.response.data.message,
      });
    }
  };

export const updatePost =
  (id, status, title, description, name, myForm) => async (dispatch) => {
    console.log(myForm);
    try {
      dispatch({
        type: "updatePostRequest",
      });

      // Get token
      const token = await AsyncStorage.getItem("token");
      const data1 = await axios.post(`${serverUrl}/user/uploadimg`, myForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      const image = data1.data.url;

      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const { data } = await axios.put(
        `${server}/news/update/${id}`,
        {
          status: status,
          title: title,
          desc: description,
          name: name,
          image: image,
        },
        {
          withCredentials: true,
          headers: headers,
        }
      );

      console.log(data.data);

      dispatch({
        type: "updatePostSuccess",
        payload: data.message,
      });
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({
        type: "updatePostFail",
        payload: error.response.data.message,
      });
    }
  };
