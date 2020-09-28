#!/usr/bin/env python
# coding: utf-8

import pandas as pd
import numpy as np
import tensorflow as tf
import jieba
import opencc
jieba.set_dictionary('dict_v2.txt')
with open('stopwords_only_symbol_v2.txt', 'r', encoding='utf8') as f:
    stops_symbol = f.read().split('\n')
input_str = input('請輸入文字:') # 輸入新聞標題
converter = opencc.OpenCC('s2twp.json')
s2twp_str = converter.convert(input_str)
jieba_str = ' '.join([t for t in jieba.cut_for_search(str(s2twp_str)) if t not in stops_symbol])
input_data_np = np.array([jieba_str])
vocab_processor = tf.contrib.learn.preprocessing.VocabularyProcessor.restore('search_jieba_no_stopwords_train_vocab.pickle')
input_data_pd = np.array(list(vocab_processor.transform(input_data_np)))
tf.reset_default_graph()
saver = tf.train.import_meta_graph("Saved_model/search_jieba_no_stopwords_train_vocab.ckpt.meta")
with tf.Session() as sess:
    saver.restore(sess, "Saved_model/search_jieba_no_stopwords_train_vocab.ckpt")
    prob_and_ans = {"Placeholder:0": input_data_pd, "Placeholder_2:0": 1}
    prob = sess.run("probability:0", feed_dict = prob_and_ans)
    ans = sess.run("ans:0", feed_dict = prob_and_ans)
    print(f'probability: {prob}') # 印出較高的機率
    print(f'ans: {ans}') # 印出真或假( 1為真, 0為假)

