export const workDetails = (workValues, key) => {
  if (!key) {
    return;
  } else {
    const workData = workValues.get(parseInt(key));

    return (
      <>
        <div>
          {workData.isOutside ? 'Work will be outside' : 'Work will be inside'}
        </div>
        <div>
          {workData.isWelding
            ? 'This job requires welding'
            : 'No welding needed for this job'}
        </div>
        <div>
          {workData.isScaffolding
            ? 'Scaffolding will be required for this job'
            : 'No scaffolding needed for this job'}
        </div>
        <div>{workData.workDetails}</div>
      </>
    );
  }
};
