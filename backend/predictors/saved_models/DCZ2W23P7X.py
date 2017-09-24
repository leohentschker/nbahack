class Model:
    """
    Write your code here!
    """

    def train(self, dataframe):
        """
        Takes in dataframe containing all
        of the relevant data we will needsd
        """

        # Cross validation function to determine optimal regularization parameter
        def avg_score_across_kfolds(pred_data, resp_data, model, num_folds = 5):
            # Create KFold object with number of folds set to 5
            kf = KFold(n = len(pred_data), n_folds = num_folds)
        
            # Collect the scores of each of the k models with same reg parameter
            kscores = []
            for train_inds, test_inds in kf:
                # Create training data subset of standardized original training data
                train_preds = pred_data.iloc[train_inds, :]
                train_resp = resp_data.iloc[train_inds]
        
                # Creating testing data subset of standardized original training data
                test_preds = pred_data.iloc[test_inds, :]
                test_resp = resp_data.iloc[test_inds]
        
                # Lazily evaluate model with desired parameters
                # See how accurate the model was on out of sample testing data
                mod = model()
                mod.fit(train_preds, train_resp)
                kscores.append(mod.score(test_preds, test_resp))
            return np.mean(kscores)

    def predict(self, data):
        """
        Takes in the data for an upcoming game
        and makes a guess as to the value
        """

    @classmethod
    def from_parameters(params):
        """
        Instantiates a trained model
        from parameters
        """
        return Model()
