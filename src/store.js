import { create } from 'zustand';
import axios from 'axios';
import { useState } from 'react';


const request = axios.create({
    baseURL: process.env.REACT_APP_baseURL,
    timeout: 1000
});

export const useStore = create((set) => {
    return {
        data: [],
        status: false,
        getData: () => {
            set({ status: false });
            request.get('/')
                .then(res => {
                    set({ data: res.data, status: true });

                })
                .catch((err) => { console.log(err) })

        },

        postData: (value) => {
            request.post('/', { id: Date.now(), name: value })
                .then(res => {
                    set({ data: res.data, status: true });
                })

        },

        putData: (id, value) => {
            request.put('/', { id: id, name: value })
                .then(res => {
                    set({ data: res.data, status: true });
                })

        },

        deleteData: (id) => {
            request.delete(`/${id}`)
                .then(res => {
                    set({ data: res.data, status: true });
                })
        }
    }
});
